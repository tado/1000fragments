uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.75; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.69 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.49) * p * 19.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 0.95 + time * 0.09, vec3(0.57, 0.46, 0.47), vec3(0.44, 0.48, 0.33), vec3(0.98, 0.78, 1.09), vec3(0.43, 0.16, 0.47)) * v;
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.92 + time * 11.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.98 + jf * 4.0), cos(t * 0.11 * jf)) * 0.70;
        xs += sin(length(p - im) * 170.66 - t * 7.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.54) * p * 13.46;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.27 + time * 0.06, vec3(0.56, 0.49, 0.57), vec3(0.46, 0.35, 0.32), vec3(1.26, 0.93, 0.85), vec3(0.27, 0.92, 0.70)) * v;
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

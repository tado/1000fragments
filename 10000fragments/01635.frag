uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.28;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 14.73 - t * 2.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.55) * p * 13.95;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.20 + time * 0.09, vec3(0.55, 0.56, 0.50), vec3(0.30, 0.38, 0.43), vec3(0.82, 0.95, 0.85), vec3(0.09, 0.45, 0.01)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

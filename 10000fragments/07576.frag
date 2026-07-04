uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.45;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 17.85 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.67;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.49) * p * 11.94;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 1.17 + time * 0.26, vec3(0.52, 0.42, 0.52), vec3(0.32, 0.43, 0.37), vec3(1.38, 1.35, 0.71), vec3(0.12, 0.18, 0.67)) * v;
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

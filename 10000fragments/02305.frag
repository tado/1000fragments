uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.47;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 16.41 - t * 1.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.84) * p * 14.47;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.82, 0.87, 0.65), vec3(0.13, 0.14, 0.12), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

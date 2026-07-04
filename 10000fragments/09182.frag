uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.56;
    float pk = 6.2831853 / 4.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 20.95 - t * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.26) * p * 15.38;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.06 + time * 0.11, vec3(0.60, 0.54, 0.43), vec3(0.50, 0.38, 0.32), vec3(1.32, 0.72, 1.14), vec3(0.96, 0.64, 0.13)) * v;
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

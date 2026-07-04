uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.10;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 19.91 - t * 5.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.19) * p * 15.62;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = mix(vec3(0.71, 0.88, 0.97), vec3(0.11, 0.05, 0.01), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

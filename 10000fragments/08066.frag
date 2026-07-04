uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.36;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 23.15 - t * 2.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	p = rot2(length(p) * 2.34 + time * 1.02) * p;
	p = rot2(p.y * 3.76 + time * 0.48) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.12; p = rot2(1.74) * p; }
	p = rot2(1.69) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.09, vec3(0.52, 0.51, 0.41), vec3(0.31, 0.48, 0.46), vec3(0.79, 1.28, 1.35), vec3(0.66, 0.31, 0.46));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

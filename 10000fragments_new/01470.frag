uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 13.03 - t * 6.94 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 18.47 - t * 5.12 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 2.79 + time * 1.02) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.28, vec3(0.55, 0.44, 0.41), vec3(0.38, 0.31, 0.50), vec3(0.89, 1.15, 1.25), vec3(0.21, 0.71, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

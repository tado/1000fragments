uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.82;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.25)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.39 - t * 7.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.63) * 1.34) * p;
	p *= 2.11;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	float d = field(p, (time * 0.63), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.45, 0.42, 0.47) + vec3(0.03, 0.00, 0.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 0.983, 0.996) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

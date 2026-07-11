uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.29;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.26)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.90 - t * 6.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.57;
	p = rot2(time * 1.27) * p;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	p = rot2(2.38) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.24, vec3(0.47, 0.58, 0.45), vec3(0.33, 0.31, 0.42), vec3(1.30, 1.01, 1.16), vec3(0.37, 0.52, 0.25));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

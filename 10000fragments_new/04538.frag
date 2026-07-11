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
    vec2 zp = p * 8.35;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.61)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 18.12 - t * 7.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.23, length(p) * 3.37 - time * 0.65); }
	p *= 2.01;
	p = rot2(1.29) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.59 + time * 0.17, vec3(0.56, 0.51, 0.50), vec3(0.35, 0.37, 0.35), vec3(1.35, 1.04, 1.11), vec3(0.17, 0.39, 0.92));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

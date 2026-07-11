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
    vec2 zp = p * 7.02;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.26)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 27.31 - t * 6.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 2.89 + time * 3.62) * 0.34;
	p = rot2(2.54) * p;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 3.27 - time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.11, vec3(0.48, 0.56, 0.57), vec3(0.46, 0.34, 0.49), vec3(1.18, 0.89, 0.90), vec3(0.66, 0.14, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

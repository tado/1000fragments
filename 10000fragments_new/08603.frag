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
    vec2 zp = p * 5.53;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.82)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.35 - t * 5.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = rot2(2.49) * p;
	p.y += sin(p.x * 4.02 + time * 2.25) * 0.15;
	p = rot2(p.y * -2.80 + time * 1.05) * p;
	{ p = vec2(atan(p.y, p.x) * 2.85, length(p) * 2.18 - time * 0.53); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.03, vec3(0.43, 0.47, 0.56), vec3(0.47, 0.33, 0.37), vec3(1.02, 1.13, 0.73), vec3(0.25, 0.11, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

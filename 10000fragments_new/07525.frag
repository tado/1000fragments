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
    vec2 zp = p * 3.58;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.67)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.62 - t * 3.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	p = rot2(1.27) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.13; p = rot2(1.88) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.14, vec3(0.56, 0.51, 0.55), vec3(0.41, 0.45, 0.46), vec3(0.81, 0.83, 0.80), vec3(0.76, 0.10, 0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

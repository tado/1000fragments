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
    vec2 zp = p * 6.03;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.43)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 25.38 - t * 2.85 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	p.x += sin(p.y * 6.65 + time * 2.31) * 0.17;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.29; p = rot2(1.44) * p; }
	p = rot2(time * -0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.19, vec3(0.46, 0.44, 0.52), vec3(0.42, 0.50, 0.45), vec3(0.83, 0.90, 0.84), vec3(0.96, 0.50, 0.99));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.53 + 0.20 * pow(abs(cos(ra * 5.0 + t * 2.32)), 0.88);
    v = sin((rr - pet) * 11.03 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.20;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.79)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 16.60 - t * 6.07 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.18, vec3(0.42, 0.54, 0.49), vec3(0.45, 0.47, 0.47), vec3(1.21, 0.74, 1.08), vec3(0.74, 0.90, 0.05));
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

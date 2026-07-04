uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.55;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.51)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 25.99 - t * 6.10 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 2.61 - t * 0.43;
    v = sin(floor(lv * 4.7) / 4.7 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.40;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.79);
	float d = d1 * d2;
	vec3 col = palette(d * 1.49 + time * 0.19, vec3(0.52, 0.51, 0.43), vec3(0.42, 0.40, 0.46), vec3(0.97, 1.20, 1.30), vec3(0.74, 0.09, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

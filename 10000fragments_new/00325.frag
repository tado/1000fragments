uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.15 + sin(p.y * 4.68 + t * 0.87) * 4.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.20;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.14)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.39 - t * 7.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.50);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.64 + time * 0.14, vec3(0.46, 0.47, 0.53), vec3(0.47, 0.34, 0.42), vec3(1.20, 0.81, 1.15), vec3(0.25, 0.55, 0.15));
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.66 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 3.90 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.94;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.37)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 24.35 - t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.39);
	float d = d1 + d2;
	vec3 col = palette(d * 1.37 + time * 0.21, vec3(0.59, 0.52, 0.43), vec3(0.30, 0.40, 0.37), vec3(1.39, 0.74, 0.96), vec3(0.62, 0.04, 0.72));
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

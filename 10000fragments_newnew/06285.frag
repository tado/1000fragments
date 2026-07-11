uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.33 + 0.15 * cos(sa * 3.0 + t * 2.42 + ph);
    v = sin((sr - petal) * 16.98);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.10;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.50)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 24.77 - t * 7.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	p += vec2(0.30, 0.49) * sin(length(p) * 2.52 - time * 1.78) * 0.34;
	p = sin(p * 2.95 + time * 1.56) * 1.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.18);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.67 + time * 0.23, vec3(0.56, 0.44, 0.53), vec3(0.48, 0.30, 0.38), vec3(0.80, 1.21, 1.05), vec3(0.26, 0.72, 0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

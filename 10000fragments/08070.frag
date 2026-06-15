uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.47 + sr * 4.55 - t * 1.12 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 18.23 - t * 4.94 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 17.58 - t * 4.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.45);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.04 + time * 0.27, vec3(0.46, 0.46, 0.41), vec3(0.50, 0.34, 0.37), vec3(1.05, 0.73, 0.97), vec3(0.11, 0.53, 0.33));
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

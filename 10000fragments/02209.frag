uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.97 + sr * 19.71 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.03, vec3(0.48, 0.44, 0.44), vec3(0.36, 0.35, 0.44), vec3(0.87, 1.18, 1.30), vec3(0.61, 0.57, 0.90));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

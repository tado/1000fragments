uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.70 + sr * 20.79 - t * 4.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.30, vec3(0.47, 0.57, 0.42), vec3(0.33, 0.42, 0.36), vec3(0.78, 0.94, 1.25), vec3(0.92, 0.14, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

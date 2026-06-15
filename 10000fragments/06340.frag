uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.52 + sr * 15.38 - t * 2.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.76 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.14, vec3(0.43, 0.46, 0.41), vec3(0.36, 0.37, 0.40), vec3(1.39, 1.08, 1.02), vec3(0.07, 0.44, 0.85));
	col = mod(col * 1.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

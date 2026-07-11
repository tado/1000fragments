uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.34 - t * 2.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.78 * fr * fr; }
	p *= 1.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.11, vec3(0.47, 0.42, 0.53), vec3(0.45, 0.33, 0.38), vec3(1.09, 0.78, 0.89), vec3(0.31, 0.01, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

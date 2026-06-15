uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.31 + sin(p.y * 3.41 + t * 5.13) * 1.05 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.23, vec3(0.60, 0.47, 0.59), vec3(0.46, 0.44, 0.49), vec3(0.79, 0.89, 0.92), vec3(0.41, 0.19, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

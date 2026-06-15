uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.39 + sin(p.y * 1.60 + t * 2.84) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.62;
	p *= 2.25;
	p = abs(p) - 0.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.28, vec3(0.53, 0.59, 0.47), vec3(0.50, 0.38, 0.31), vec3(1.02, 1.31, 1.38), vec3(0.99, 0.90, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

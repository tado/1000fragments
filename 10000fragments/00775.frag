uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.42 + sin(p.y * 4.77 + t * 0.81) * 1.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.18, vec3(0.41, 0.56, 0.51), vec3(0.41, 0.41, 0.41), vec3(1.23, 0.99, 1.38), vec3(0.10, 0.08, 0.39));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

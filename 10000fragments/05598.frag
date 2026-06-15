uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.33 - t * 5.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.21, vec3(0.50, 0.59, 0.56), vec3(0.38, 0.40, 0.37), vec3(1.18, 1.18, 1.11), vec3(0.51, 0.72, 0.74));
	col = fract(col * 2.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

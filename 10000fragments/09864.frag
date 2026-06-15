uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.80 + sin(p.y * 4.44 + t * 2.65) * 1.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.75) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.11, vec3(0.47, 0.42, 0.56), vec3(0.44, 0.49, 0.44), vec3(1.09, 0.76, 1.28), vec3(0.26, 0.77, 0.51));
	col = mod(col * 2.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

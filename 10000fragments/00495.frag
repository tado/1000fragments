uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.32 + sin(p.y * 5.17 + t * 4.40) * 2.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.25, vec3(0.59, 0.53, 0.58), vec3(0.34, 0.47, 0.48), vec3(0.92, 0.76, 1.34), vec3(0.14, 0.50, 0.51));
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

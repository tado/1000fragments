uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.62 + t * 0.69) - 0.5) * 2.0;
    v = sin((p.y * 5.79 + zx * 1.74 + t * 2.48) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.01, vec3(0.49, 0.42, 0.44), vec3(0.45, 0.49, 0.44), vec3(0.99, 1.37, 0.89), vec3(0.99, 0.86, 0.05));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

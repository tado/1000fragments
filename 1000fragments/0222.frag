uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.13 - t * 5.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.25, vec3(0.54, 0.57, 0.41), vec3(0.46, 0.49, 0.44), vec3(1.39, 1.14, 0.88), vec3(0.34, 0.42, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.93 - t * 5.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	p += vec2(-0.42, -0.04) * sin(length(p) * 3.99 - time * 1.38) * 0.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.62 + time * 0.12, vec3(0.48, 0.44, 0.50), vec3(0.48, 0.33, 0.38), vec3(1.32, 1.04, 1.23), vec3(0.35, 0.02, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

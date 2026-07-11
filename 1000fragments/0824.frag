uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.59 - t * 6.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.11, vec3(0.58, 0.41, 0.46), vec3(0.37, 0.48, 0.43), vec3(0.81, 1.22, 0.92), vec3(0.13, 0.30, 0.20));
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

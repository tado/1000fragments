uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.76 - t * 4.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.81 + time * 0.26, vec3(0.48, 0.56, 0.41), vec3(0.46, 0.45, 0.41), vec3(0.89, 1.14, 0.81), vec3(0.01, 0.33, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

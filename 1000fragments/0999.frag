uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.69 - t * 7.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.11, vec3(0.52, 0.59, 0.48), vec3(0.48, 0.31, 0.42), vec3(0.98, 1.14, 1.40), vec3(0.41, 0.27, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

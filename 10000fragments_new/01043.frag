uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.27 * pow(abs(cos(ra * 3.0 + t * 1.67)), 2.65);
    v = sin((rr - pet) * 18.28 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.14, vec3(0.47, 0.41, 0.56), vec3(0.41, 0.43, 0.30), vec3(1.28, 1.07, 0.77), vec3(0.02, 0.85, 0.19));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

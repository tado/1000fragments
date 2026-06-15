uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.14 - t * 8.18 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.58;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.23, vec3(0.56, 0.54, 0.52), vec3(0.32, 0.40, 0.38), vec3(0.89, 1.23, 0.77), vec3(0.68, 0.24, 0.13));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

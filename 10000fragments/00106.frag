uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.73 + t * 1.11 + ph) + sin(p.y * 12.33 - t * 5.46 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	p += vec2(-0.54, 0.97) * sin(length(p) * 5.01 - time * 1.39) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.04, vec3(0.57, 0.53, 0.54), vec3(0.44, 0.38, 0.32), vec3(0.82, 1.14, 1.13), vec3(0.61, 0.97, 0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

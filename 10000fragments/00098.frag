uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.20 + t * 2.05 + ph) + sin(p.y * 16.33 - t * 3.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.09, vec3(0.41, 0.57, 0.60), vec3(0.42, 0.41, 0.36), vec3(1.21, 0.87, 1.20), vec3(0.59, 0.29, 0.69));
	col = mod(col * 1.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

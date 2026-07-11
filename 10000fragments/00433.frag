uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.22 + t * 0.89 + ph) + sin(p.y * 9.73 - t * 4.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.35 + time * 0.07, vec3(0.54, 0.42, 0.46), vec3(0.44, 0.42, 0.33), vec3(0.92, 1.35, 0.74), vec3(0.79, 0.65, 0.24));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

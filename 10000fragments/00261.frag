uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.71 + t * 4.40 + ph) + sin(p.y * 14.25 - t * 5.83 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.61, -0.73) * sin(length(p) * 4.29 - time * 0.71) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.24, vec3(0.44, 0.53, 0.42), vec3(0.42, 0.31, 0.49), vec3(0.94, 0.84, 0.77), vec3(0.81, 0.06, 0.44));
	col = fract(col * 1.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

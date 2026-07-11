uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.82);
    float gsh = hash21(vec2(grow, floor(t * 5.14))) - 0.5;
    float gx = p.x + gsh * 0.90;
    v = sin(gx * 15.12 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.43));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.78;
	p = rot2(length(p) * -1.75 + time * 0.95) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.03, 1.36, 0.92) + vec3(0.01, 0.24, 0.05);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 0.83 + time * 4.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

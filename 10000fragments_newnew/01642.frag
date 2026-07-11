uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.33);
    float gsh = hash21(vec2(grow, floor(t * 2.75))) - 0.5;
    float gx = p.x + gsh * 0.44;
    v = sin(gx * 12.81 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.64));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.85) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.01, 0.44), vec3(0.53, 0.68, 0.69), d);
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.41 + time * 14.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

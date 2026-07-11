uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.66 + t * 1.12 + ph) * 0.7;
    float wb = sin(p.y * 4.12 - t * 1.70 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.16) - 0.5;
	p = rot2(0.84) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.18, 0.52), vec3(0.76, 0.91, 0.67), d);
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 0.92 + time * 15.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

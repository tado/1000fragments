uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.15 * jf)) * 0.66;
        xs += sin(length(p - im) * 211.04 - t * 12.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	{ float fr = length(p); p *= 1.0 + -0.46 * fr * fr; }
	p = rot2(time * -0.29) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.40, 0.33), vec3(0.80, 0.87, 0.90), d);
	col = fract(col * 2.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

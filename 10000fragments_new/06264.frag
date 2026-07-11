uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.59 + jf * 4.0), cos(t * 0.54 * jf)) * 0.38;
        xs += sin(length(p - im) * 176.54 - t * 7.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.60;
	p = rot2(length(p) * 1.17 + time * 1.47) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.18, 0.31), vec3(0.84, 0.82, 0.85), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

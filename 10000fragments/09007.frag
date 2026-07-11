uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.22 * jf)) * 0.42;
        xs += sin(length(p - im) * 76.35 - t * 6.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.92;
	p = rot2(1.86) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.08, 0.17), vec3(0.56, 0.71, 0.92), d);
	col = mod(col * 2.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

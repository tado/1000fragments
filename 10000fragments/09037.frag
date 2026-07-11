uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.47 * jf)) * 0.72;
        xs += sin(length(p - im) * 84.14 - t * 5.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 1.63) - 0.5;
	p += vec2(-0.94, -0.91) * sin(length(p) * 4.20 - time * 1.62) * 0.30;
	p = rot2(time * 1.25) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.36, 0.40), vec3(0.78, 0.53, 0.79), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.66 + jf * 4.0), cos(t * 0.41 * jf)) * 0.63;
        xs += sin(length(p - im) * 208.53 - t * 6.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	p += vec2(-0.45, -0.65) * sin(length(p) * 2.32 - time * 1.54) * 0.36;
	p = rot2(p.y * -2.27 + time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.16, vec3(0.42, 0.54, 0.56), vec3(0.37, 0.38, 0.33), vec3(1.05, 1.04, 1.01), vec3(0.82, 0.51, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

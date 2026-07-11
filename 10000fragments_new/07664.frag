uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.21 + jf * 4.0), cos(t * 0.42 * jf)) * 0.53;
        xs += sin(length(p - im) * 119.01 - t * 10.06 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	p = fract(p * 2.48) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.74 + time * 0.30, vec3(0.54, 0.55, 0.44), vec3(0.49, 0.49, 0.47), vec3(0.96, 0.79, 1.00), vec3(0.79, 0.53, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

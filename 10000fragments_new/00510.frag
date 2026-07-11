uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.56 * jf)) * 0.44;
        xs += sin(length(p - im) * 72.39 - t * 10.32 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.10, vec3(0.40, 0.41, 0.45), vec3(0.42, 0.46, 0.39), vec3(1.25, 0.75, 0.88), vec3(0.17, 0.77, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
